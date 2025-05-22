using Liga_Rechi.DataLayer.Entities.Files;
using System.Diagnostics.Contracts;

namespace Liga_Rechi.DataLayer.Entities;

public class UserEntity
{
    public int? Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string Salt { get; set; } = "";
    public string Number { get; set; } = "";
    public string Status { get; set; } = "";
    public int Level { get; set; } = 1;
    public DateTime CreationDate { get; set; }
    public bool IsAdmin { get; set; }
    public bool IsActive { get; set; }
    
    public virtual ICollection<UserFileEntity> Files { get; set; }
    public virtual ICollection<ProjectEntity> ManagedProjects { get; set; }
    public virtual ICollection<CommunityEntity> CuratedCommunities { get; set; }
    public virtual ICollection<ProjectTeamEntity> ProjectTeams { get; set; }
    public virtual ICollection<EventTeamEntity> EventTeams { get; set; }
    public virtual ICollection<CommunityTeamEntity> CommunityTeams { get; set; }
    public virtual ICollection<EventParticipantEntity> ParticipationProjects { get; set; }
    public virtual ICollection<RewardIssuanceEntity> RewardIssuances { get; set; }
    public virtual ICollection<UserSkillEntity> UserSkills { get; set; }
}
