namespace OutOfOffice.Common.Exceptions;

public class InvalidSecurityAlgorithmException : Exception
{
    public InvalidSecurityAlgorithmException(string? message)
        : base(message) { }
}
