using Microsoft.EntityFrameworkCore;
using SkillConnect.Models;

public static class ModelBuilderExtensions
{
    public static void Seed(this ModelBuilder modelBuilder)
    {
        // States
        modelBuilder.Entity<State>().HasData(
            new State { Id = 1, Name = "Andhra Pradesh", NameTelugu = "ఆంధ్రప్రదేశ్" },
            new State { Id = 2, Name = "Telangana", NameTelugu = "తెలంగాణ" },
            new State { Id = 3, Name = "Tamil Nadu", NameTelugu = "తమిళనాడు" },
            new State { Id = 4, Name = "Karnataka", NameTelugu = "కర్ణాటక" }
        );

        // Districts
        modelBuilder.Entity<District>().HasData(
            new District { Id = 1, Name = "Visakhapatnam", NameTelugu = "విశాఖపట్నం", StateId = 1 },
            new District { Id = 2, Name = "Vijayawada", NameTelugu = "విజయవాడ", StateId = 1 },
            new District { Id = 3, Name = "Hyderabad", NameTelugu = "హైదరాబాద్", StateId = 2 },
            new District { Id = 4, Name = "Warangal", NameTelugu = "వారంగల్", StateId = 2 },
            new District { Id = 5, Name = "Chennai", NameTelugu = "చెన్నై", StateId = 3 },
            new District { Id = 6, Name = "Coimbatore", NameTelugu = "కోయంబత్తూరు", StateId = 3 },
            new District { Id = 7, Name = "Bengaluru", NameTelugu = "బెంగుళూరు", StateId = 4 },
            new District { Id = 8, Name = "Mysuru", NameTelugu = "మైసూరు", StateId = 4 }
        );

        // ITI Trades
        modelBuilder.Entity<Trade>().HasData(
            new Trade { TradeId = 1, TradeName = "Electrician", TradeNameTelugu = "ఎలక్ట్రీషియన్" },
            new Trade { TradeId = 2, TradeName = "Fitter", TradeNameTelugu = "ఫిట్టర్" },
            new Trade { TradeId = 3, TradeName = "Welder", TradeNameTelugu = "వెల్డర్" },
            new Trade { TradeId = 4, TradeName = "Turner", TradeNameTelugu = "టర్నర్" },
            new Trade { TradeId = 5, TradeName = "Machinist", TradeNameTelugu = "మెషినిస్ట్" },
            new Trade { TradeId = 6, TradeName = "Plumber", TradeNameTelugu = "ప్లంబర్" },
            new Trade { TradeId = 7, TradeName = "Refrigeration & Air Conditioning", TradeNameTelugu = "ఎయిర్ కండిషనింగ్ మరియు రిఫ్రిజరేషన్" },
            new Trade { TradeId = 8, TradeName = "Mechanic Diesel", TradeNameTelugu = "మెకానిక్ డీజిల్" },
            new Trade { TradeId = 9, TradeName = "Mechanic Motor Vehicle", TradeNameTelugu = "మెకానిక్ మోటార్ వాహనం" },
            new Trade { TradeId = 10, TradeName = "Computer Operator and Programming Assistant (COPA)", TradeNameTelugu = "కంప్యూటర్ ఆపరేటర్ మరియు ప్రోగ్రామింగ్ అసిస్టెంట్" }
        );
    }
}