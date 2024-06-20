using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OutOfOffice.BLL.Interfaces;
using OutOfOffice.Common.DTOs;
using OutOfOffice.Common.Extensions;
using OutOfOffice.Common.Requests;

namespace OutOfOffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequestService _leaveRequestService;

        public LeaveRequestController(ILeaveRequestService leaveRequestService)
        {
            _leaveRequestService = leaveRequestService;
        }

        [HttpGet]
        public async Task<IActionResult> GetLeaveRequests()
        {
            var result = await _leaveRequestService.GetLeaveRequestsAsync();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLeaveRequest(int id)
        {
            var result = await _leaveRequestService.GetLeaveRequestByIdAsync(id);

            return Ok(result);
        }

        [HttpPut("[action]")]
        [Authorize(Roles = "HR manager")]
        public async Task<IActionResult> IsApproved(IsApprovedRequest request)
        {
            var result = await _leaveRequestService.IsApprovedAsync(request);

            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddLeaveRequest(CreateLeaveRequestDTO dto)
        {
            var id = HttpContext.GetUserId();
            var result = await _leaveRequestService.AddLeaveRequestAsync(id, dto);

            return Ok(result);
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> CanceledLeaveRequest(int id)
        {
            var result =  await _leaveRequestService.CanceledLeaveRequestAsync(id);

            return result ? Ok() : NotFound();
        }
    }
}
