var rand = Math.random;
Math.random = function(min, max)
{
    if (min == undefined || max == undefined)
    {
        return rand();
    }
    
    return min + rand() * (max + 1 - min);
}