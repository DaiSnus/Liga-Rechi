namespace Liga_Rechi.DataLayer.Entities;

public class TrainerVisitsEntity
{
    public int? Id { get; set; }
    public int? EventParticipantId { get; set; }
    public int? TrainerId { get; set; }

    public virtual EventParticipantEntity EventParticipant { get; set; }
    public virtual UserEntity Trainer { get; set; }
}
