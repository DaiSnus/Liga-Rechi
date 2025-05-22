using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Admin;

namespace Liga_Rechi.Mapper;

public static class EventMapper
{
    public static Event? EventEntityToEventModel(EventEntity? eventEntity)
    {
        if (eventEntity == null)
            return null;
        return new Event
        {
            Id = eventEntity.Id,
            Date = eventEntity.Date,
            Description = eventEntity.Description ?? "",
            Price = eventEntity.Price,
            ProjectId = eventEntity.ProjectId,
            Title = eventEntity.Title ?? ""
        };
    }

    //public static EventEntity? EventModelToEventEntity(Event? eventModel)
    //{
    //    if (eventModel == null) 
    //        return null;
    //    return new EventEntity
    //    {
    //        Title = eventModel.Title ?? "",
    //        Description = eventModel.Description ?? "",
    //        Price= eventModel.Price,
    //        ProjectId = eventModel.ProjectId,
            
    //    };
    //}
}