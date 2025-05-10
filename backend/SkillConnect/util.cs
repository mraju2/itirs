namespace SkillConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using SkillConnect.Models.Enums;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

public static class Util
{
    public static List<MinimumQualification> FromCsv(string csv)
    {
        return csv.Split(',', StringSplitOptions.RemoveEmptyEntries)
                  .Select(q => System.Enum.TryParse<MinimumQualification>(q.Trim(), out var result) ? result : throw new Exception($"Invalid qualification: {q}"))
                  .ToList();
    }

    public static string ToCsv(List<MinimumQualification> qualifications)
    {
        return string.Join(",", qualifications.Select(q => q.ToString()));
    }

}
