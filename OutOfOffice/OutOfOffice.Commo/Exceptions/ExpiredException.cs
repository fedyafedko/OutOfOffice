﻿namespace OutOfOffice.Common.Exceptions;

public class ExpiredException : Exception
{
    public ExpiredException(string? message)
        : base(message) { }
}
