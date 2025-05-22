namespace Liga_Rechi.DataLayer.Entities;

public class CommunityTeamEntity
{
    public int? Id { get; set; }
    public int? UserId { get; set; }
    public int? CommunityId { get; set; }

    public virtual CommunityEntity Community { get; set; }
    public virtual UserEntity User { get; set; }
}
