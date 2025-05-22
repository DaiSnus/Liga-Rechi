using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.DataLayer.Entities.Files;
using Microsoft.EntityFrameworkCore;
using Minio.Exceptions;

namespace Liga_Rechi.DataLayer;

public class LigaAppDbContext : DbContext
{
    public LigaAppDbContext(DbContextOptions<LigaAppDbContext> options)
            : base(options)
    {

    }

    public DbSet<UserEntity> Users { get; set; }
    public DbSet<ProjectEntity> Projects { get; set; }
    public DbSet<EventEntity> Events { get; set; }
    public DbSet<FileEntity> Files { get; set; }
    public DbSet<EventParticipantEntity> EventsParticipants { get; set; }
    public DbSet<EventTeamEntity> EventTeams { get; set; }
    public DbSet<ProjectTeamEntity> ProjectTeams { get; set; }
    public DbSet<ProjectFileEntity> ProjectFiles { get; set; }
    public DbSet<UserFileEntity> UserFiles { get; set; }
    public DbSet<RewardIssuanceEntity> RewardIssuance { get; set; }
    public DbSet<CommunityEntity> Communities { get; set; }
    public DbSet<CommunityFileEntity> CommunityFiles { get; set; }
    public DbSet<CommunityTeamEntity> CommunityTeams { get; set; }
    public DbSet<EventTrainerSkillEntity> EventTrainerSkills { get; set; }
    public DbSet<ProjectRewardTemplateEntity> ProjectRewardTemplates { get; set; }
    public DbSet<RewardSkillExperienceEntity> RewardSkillExperiences { get; set; }
    public DbSet<RewardTemplateEntity> RewardTemplates { get; set; }
    public DbSet<SkillEntity> Skills { get; set; }
    public DbSet<TrainerVisitsEntity> TrainerVisits { get; set; }
    public DbSet<UserSkillEntity> UserSkills { get; set; }
    public DbSet<RoleEntity> Roles { get; set; }
    public DbSet<RewardTemplateFileEntity> RewardFiles { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        AutoIncrementAdd(modelBuilder);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.ParticipationProjects) //Один пользователь может участвовать во множестве проектов
            .WithOne(p => p.User) //Одно участие в определенном проекте может быть у одного пользователя
            .HasForeignKey(p => p.UserId) //Внешний ключ в таблице участия
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.ManagedProjects)//Один пользователь может управлять множеством проектов
            .WithOne(mp => mp.Leader)//у проекта может быть только один лидер
            .HasForeignKey(mp => mp.LeaderId)/*внешний ключ*/
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.Files)//у одного пользователя может быть множество файлов
            .WithOne(f => f.User)//у конкретного файла только один пользователь
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.EventTeams)//у одного пользователя может быть множество команд мероприятий
            .WithOne(et => et.User)//в одной команде может быть только один конкретный пользователь
            .HasForeignKey(et => et.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.ProjectTeams)//у одного пользователя много команд проектов
            .WithOne(pt => pt.User)//в команде может быть только один конкретный пользователь
            .HasForeignKey(pt => pt.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.RewardIssuances)//у пользователя много наград
            .WithOne(a => a.User)//награда может быть только у одного пользователя
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<ProjectEntity>()
            .HasMany(p => p.ProjectRewardTemplates)//у проекта много шаблонов наград
            .WithOne(a => a.Project)//шаблон наград может быть только у одного проекта
            .HasForeignKey(a => a.ProjectId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<ProjectEntity>()
            .HasMany(p => p.Files)//у проекта может быть много файлов
            .WithOne(f => f.Project)//один конкретный файл может быть только у одного проекта
            .HasForeignKey(f => f.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProjectEntity>()
            .HasMany(p => p.Events)//у проекта много мероприятий
            .WithOne(e => e.Project)//у одного мероприятия только один проект
            .HasForeignKey(e => e.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProjectEntity>()
            .HasMany(p => p.Team)//У одного проекта может быть много команд
            .WithOne(t => t.Project)//Одна определенная команда отвечает за один проект
            .HasForeignKey(t => t.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<EventEntity>()
            .HasMany(e => e.Managers)//У мероприятия может быть много команд
            .WithOne(m => m.Event)//Одна определенная команда отвечает за одно мероприятие
            .HasForeignKey(e => e.EventId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<EventEntity>()
            .HasMany(e => e.Participants)//У мероприятия может быть много участников
            .WithOne(m => m.Event)//один определенный участник участвует только в одной команде
            .HasForeignKey(e => e.EventId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProjectFileEntity>()
            .HasOne(pf => pf.File)//у проекта есть файлы
            .WithMany()//у файла могут не быть проектов
            .HasForeignKey(pf => pf.FileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserFileEntity>()
            .HasOne(uf => uf.File)//у пользователя есть файлы
            .WithMany()//у файла могут не быть пользователи
            .HasForeignKey(uf => uf.FileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CommunityFileEntity>()
            .HasOne(cf => cf.File)//у сообщества могут быть файлы
            .WithMany()//у файла может не быть сообществ
            .HasForeignKey(cf => cf.FileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.CommunityTeams)//пользователь может быть в командах сообществ
            .WithOne(ct => ct.User)//в команде может быть только один определенный пользователь
            .HasForeignKey(ct => ct.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.CuratedCommunities)//юзер может куррировать несколькими сообществами 
            .WithOne(cc => cc.Tutor)//у сообщества только один куратор
            .HasForeignKey(cc => cc.TutorId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<CommunityEntity>()
            .HasMany(c => c.Files)//связующая таблица файлов и сообществ
            .WithOne(cf => cf.Community)//
            .HasForeignKey(cf => cf.CommunityId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<CommunityEntity>()
            .HasMany(c => c.Team)//у сообщества есть команда 
            .WithOne(ct => ct.Community)//команда может управлять только одним сообществом
            .HasForeignKey(ct => ct.CommunityId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<CommunityEntity>()
            .HasMany(c => c.Events)//у сообщества могут быть мероприятия
            .WithOne(e => e.Community)//одно мероприятие может быть только у одного сообщества
            .HasForeignKey(c => c.CommunityId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<RewardIssuanceEntity>()
            .HasMany(r => r.RewardSkillExperience)//связующая таблица для наград и навыков
            .WithOne(rse => rse.RewardIssuance)//
            .HasForeignKey(rse => rse.RewardIssuanceId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<RewardTemplateEntity>()
            .HasMany(rt => rt.RewardIssuances)//у шаблона наград может быть множество фактов выдачи наград
            .WithOne(r => r.RewardTemplate)//награда имеет только один шаблон
            .HasForeignKey(r => r.RewardTemplateId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<RewardTemplateEntity>()
            .HasMany(rt => rt.ProjectRewardTemplates)//связующая таблица шаблонов и проекта 
            .WithOne(prt => prt.RewardTemplate)//
            .HasForeignKey(prt => prt.RewardTemplateId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<SkillEntity>()
            .HasMany(s => s.UserSkills)//связующая таблица между юзером и навыком
            .WithOne(us => us.Skill)//
            .HasForeignKey(us => us.SkillId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<SkillEntity>()
            .HasMany(s => s.RewardSkillExperiences)//таблица для связи навыков и опыта от наград
            .WithOne(rse => rse.Skill)//
            .HasForeignKey(rse => rse.SkillId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EventEntity>()
            .HasOne(e => e.PumpingSkill)//мероприятие может прокачивать определенный навык
            .WithMany()//навык может не иметь связных мероприятий
            .HasForeignKey(e => e.PumpingSkillId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EventTrainerSkillEntity>()
            .HasOne(ets => ets.Trainer)//таблица для связи мероприятия, тренера и прокачиваемого навыка
            .WithMany()//
            .HasForeignKey(ets => ets.TrainerId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EventTrainerSkillEntity>()
            .HasOne(ets => ets.Skill)//таблица для связи мероприятия, тренера и прокачиваемого навыка
            .WithMany()//
            .HasForeignKey(ets => ets.SkillId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EventEntity>()
            .HasMany(e => e.TrainerSkills)//таблица для связи мероприятия, тренера и прокачиваемого навыка
            .WithOne(ts => ts.Event)
            .HasForeignKey(ts => ts.EventId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.UserSkills)//таблица для связи юзера и навыков
            .WithOne(us => us.User)//
            .HasForeignKey(us => us.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EventParticipantEntity>()
            .HasMany(ep => ep.TrainerVisits)//юзер на мероприятии может посетить несколько тренеров
            .WithOne(tv => tv.EventParticipant)//каждой посещение имеет конкретного юзера
            .HasForeignKey(tv => tv.EventParticipantId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<TrainerVisitsEntity>()
            .HasOne(tv => tv.Trainer)//таблица для связи тренера и посещения тренера 
            .WithMany()//
            .HasForeignKey(tv => tv.TrainerId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<RoleEntity>()
            .HasMany(r => r.Participants)//Роль присвается каждому посещению
            .WithOne(ep => ep.Role)//Каждое посещение имеет одну роль
            .HasForeignKey(ep => ep.RoleId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<RewardTemplateFileEntity>()
            .HasOne(rf => rf.File)//таблица связи файлов и наград
            .WithMany()//
            .HasForeignKey(rf => rf.FileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<RewardTemplateEntity>()
            .HasOne(r => r.File)//у награды только логотип, поэтому связь один к одному
            .WithOne(rf => rf.RewardTemplate)//
            .HasForeignKey<RewardTemplateFileEntity>(rf => rf.RewardId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    void AutoIncrementAdd(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RewardTemplateFileEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<RoleEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<UserEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<ProjectEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<EventEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<EventParticipantEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<EventTeamEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<ProjectTeamEntity>()
            .Property (x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<FileEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<RewardTemplateEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<UserFileEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<ProjectFileEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<CommunityEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<CommunityFileEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<CommunityTeamEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<EventTrainerSkillEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<ProjectRewardTemplateEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<RewardSkillExperienceEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<RewardTemplateEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<SkillEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<TrainerVisitsEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<UserSkillEntity>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();
    }
}