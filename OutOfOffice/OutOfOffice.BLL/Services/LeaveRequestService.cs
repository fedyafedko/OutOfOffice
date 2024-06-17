using AutoMapper;
using Azure.Core;
using Microsoft.EntityFrameworkCore;
using OutOfOffice.BLL.Interfaces;
using OutOfOffice.Common.DTOs;
using OutOfOffice.Common.Exceptions;
using OutOfOffice.Common.Requests;
using OutOfOffice.DAL.Repositories.Interfaces;
using OutOfOffice.Entities;
using OutOfOffice.Entities.Enums;

namespace OutOfOffice.BLL.Services;

public class LeaveRequestService : ILeaveRequestService
{
    private readonly IRepository<LeaveRequest> _leaveRequestRepository;
    private readonly IRepository<ApprovalRequest> _approvalRequestRepository;
    private readonly IRepository<Employee> _employeeRepository;
    private readonly IMapper _mapper;

    public LeaveRequestService(
        IRepository<LeaveRequest> leaveRequestRepository,
        IRepository<ApprovalRequest> approvalRequestRepository,
        IRepository<Employee> employeeRepository,
        IMapper mapper)
    {
        _leaveRequestRepository = leaveRequestRepository;
        _approvalRequestRepository = approvalRequestRepository;
        _employeeRepository = employeeRepository;
        _mapper = mapper;
    }

    public async Task<List<LeaveRequestDTO>> GetLeaveRequestsAsync(SortRequest request)
    {
        var leaveRequests = await _leaveRequestRepository
            .Include(x => x.Employee)
            .Include(x => x.ApprovalRequest)
            .ToListAsync();

        if (!string.IsNullOrEmpty(request.SortBy))
        {
            var sortBy = request.SortBy.ToLower();

            var sortingDictionary = new Dictionary<string, Func<IQueryable<LeaveRequest>, IOrderedQueryable<LeaveRequest>>>
        {
            { nameof(LeaveRequest.AbsenceReason).ToLower(), query => query.OrderBy(e => e.AbsenceReason) },
            { nameof(LeaveRequest.StartDate).ToLower(), query => query.OrderBy(e => e.StartDate) },
            { nameof(LeaveRequest.EndDate).ToLower(), query => query.OrderBy(e => e.EndDate) },
            { nameof(LeaveRequest.Comment).ToLower(), query => query.OrderBy(e => e.Comment) },
            { nameof(LeaveRequest.Status).ToLower(), query => query.OrderBy(e => e.Status) }
        };

            if (sortingDictionary.TryGetValue(sortBy, out var orderBy))
            {
                leaveRequests = orderBy(leaveRequests.AsQueryable()).ToList();
            }
        }

        return _mapper.Map<List<LeaveRequestDTO>>(leaveRequests);
    }

    public async Task<LeaveRequestDTO> GetLeaveRequestByIdAsync(int id)
    {
        var leaveRequest = await _leaveRequestRepository
            .Include(x => x.Employee)
            .Include(x => x.ApprovalRequest)
            .FirstOrDefaultAsync(x => x.Id == id)
            ?? throw new NotFoundException("Leave request not found");

        return _mapper.Map<LeaveRequestDTO>(leaveRequest);
    }

    public async Task<bool> IsApprovedAsync(IsApprovedRequest request)
    {
        var leaveRequest = await _leaveRequestRepository
            .Include(x => x.Employee)
            .Include(x => x.ApprovalRequest)
            .FirstOrDefaultAsync(x => x.Id == request.LeaveRequestId)
            ?? throw new NotFoundException("Leave request not found");

        var aprovalRequest = new ApprovalRequest { LeaveRequestId = request.LeaveRequestId, };

        if (request.IsApproved)
        {
            leaveRequest.Employee.OutOfOfficeBalance = request.OutOfOfficeBalance;
            aprovalRequest.Status = StatusApprovalRequest.Approve;

            await _employeeRepository.UpdateAsync(leaveRequest.Employee);
            await _approvalRequestRepository.UpdateAsync(aprovalRequest);
        }
        else if (!request.IsApproved)
        {
            aprovalRequest.Status = StatusApprovalRequest.Reject;
            aprovalRequest.Comment = request.Comment;

            await _employeeRepository.UpdateAsync(leaveRequest.Employee);
        }
         
        return true;
    }

    public async Task<LeaveRequestDTO> AddLeaveRequestAsync(int id, CreateLeaveRequestDTO request)
    {
        var leaveRequest = _mapper.Map<LeaveRequest>(request);
        leaveRequest.Id = id;

        await _leaveRequestRepository.InsertAsync(leaveRequest);

        return _mapper.Map<LeaveRequestDTO>(leaveRequest);
    }

    public async Task<bool> CanceledLeaveRequestAsync(int id)
    {
        var leaveRequest = await _leaveRequestRepository.FirstOrDefaultAsync(x => x.Id == id)
            ?? throw new NotFoundException("Leave request not found");

        leaveRequest.Status = StatusLeaveRequest.Cancel;

        var result = await _leaveRequestRepository.UpdateAsync(leaveRequest);

        return result;
    }
}