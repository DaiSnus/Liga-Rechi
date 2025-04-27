using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Liga_Rechi.Migrations
{
    /// <inheritdoc />
    public partial class Recycling : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectFileEntity_Files_FileId1",
                table: "ProjectFileEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectFileEntity_Projects_FileId",
                table: "ProjectFileEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFileEntity_Files_FileId",
                table: "UserFileEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFileEntity_Users_UserId",
                table: "UserFileEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserFileEntity",
                table: "UserFileEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectFileEntity",
                table: "ProjectFileEntity");

            migrationBuilder.DropIndex(
                name: "IX_ProjectFileEntity_FileId1",
                table: "ProjectFileEntity");

            migrationBuilder.DropColumn(
                name: "FileId1",
                table: "ProjectFileEntity");

            migrationBuilder.RenameTable(
                name: "UserFileEntity",
                newName: "UserFiles");

            migrationBuilder.RenameTable(
                name: "ProjectFileEntity",
                newName: "ProjectFiles");

            migrationBuilder.RenameIndex(
                name: "IX_UserFileEntity_UserId",
                table: "UserFiles",
                newName: "IX_UserFiles_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserFileEntity_FileId",
                table: "UserFiles",
                newName: "IX_UserFiles_FileId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ProjectFiles",
                newName: "ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectFileEntity_FileId",
                table: "ProjectFiles",
                newName: "IX_ProjectFiles_FileId");

            migrationBuilder.AddColumn<int>(
                name: "CommunityId",
                table: "Events",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PumpingSkillId",
                table: "Events",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserFiles",
                table: "UserFiles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectFiles",
                table: "ProjectFiles",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Communities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    TutorId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Communities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Communities_Users_TutorId",
                        column: x => x.TutorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "RewardTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RewardTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrainerVisits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EventParticipantId = table.Column<int>(type: "integer", nullable: true),
                    TrainerId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainerVisits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainerVisits_EventsParticipants_EventParticipantId",
                        column: x => x.EventParticipantId,
                        principalTable: "EventsParticipants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TrainerVisits_Users_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "CommunityFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CommunityId = table.Column<int>(type: "integer", nullable: true),
                    FileId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunityFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommunityFiles_Communities_CommunityId",
                        column: x => x.CommunityId,
                        principalTable: "Communities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_CommunityFiles_Files_FileId",
                        column: x => x.FileId,
                        principalTable: "Files",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "CommunityTeams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    CommunityId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunityTeams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommunityTeams_Communities_CommunityId",
                        column: x => x.CommunityId,
                        principalTable: "Communities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_CommunityTeams_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ProjectRewardTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProjectId = table.Column<int>(type: "integer", nullable: true),
                    RewardTemplateId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectRewardTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectRewardTemplates_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_ProjectRewardTemplates_RewardTemplates_RewardTemplateId",
                        column: x => x.RewardTemplateId,
                        principalTable: "RewardTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Rewards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    RewardTemplateId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rewards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rewards_RewardTemplates_RewardTemplateId",
                        column: x => x.RewardTemplateId,
                        principalTable: "RewardTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Rewards_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "EventTrainerSkills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EventId = table.Column<int>(type: "integer", nullable: true),
                    SkillId = table.Column<int>(type: "integer", nullable: true),
                    TrainerId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventTrainerSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventTrainerSkills_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_EventTrainerSkills_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_EventTrainerSkills_Users_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "UserSkills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TotalExpirience = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    SkillId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSkills_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_UserSkills_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "RewardSkillExperiences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Experience = table.Column<int>(type: "integer", nullable: false),
                    RewardId = table.Column<int>(type: "integer", nullable: true),
                    SkillId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RewardSkillExperiences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RewardSkillExperiences_Rewards_RewardId",
                        column: x => x.RewardId,
                        principalTable: "Rewards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_RewardSkillExperiences_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_CommunityId",
                table: "Events",
                column: "CommunityId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_PumpingSkillId",
                table: "Events",
                column: "PumpingSkillId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectFiles_ProjectId",
                table: "ProjectFiles",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Communities_TutorId",
                table: "Communities",
                column: "TutorId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityFiles_CommunityId",
                table: "CommunityFiles",
                column: "CommunityId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityFiles_FileId",
                table: "CommunityFiles",
                column: "FileId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityTeams_CommunityId",
                table: "CommunityTeams",
                column: "CommunityId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityTeams_UserId",
                table: "CommunityTeams",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EventTrainerSkills_EventId",
                table: "EventTrainerSkills",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventTrainerSkills_SkillId",
                table: "EventTrainerSkills",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_EventTrainerSkills_TrainerId",
                table: "EventTrainerSkills",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectRewardTemplates_ProjectId",
                table: "ProjectRewardTemplates",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectRewardTemplates_RewardTemplateId",
                table: "ProjectRewardTemplates",
                column: "RewardTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Rewards_RewardTemplateId",
                table: "Rewards",
                column: "RewardTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Rewards_UserId",
                table: "Rewards",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RewardSkillExperiences_RewardId",
                table: "RewardSkillExperiences",
                column: "RewardId");

            migrationBuilder.CreateIndex(
                name: "IX_RewardSkillExperiences_SkillId",
                table: "RewardSkillExperiences",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerVisits_EventParticipantId",
                table: "TrainerVisits",
                column: "EventParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerVisits_TrainerId",
                table: "TrainerVisits",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSkills_SkillId",
                table: "UserSkills",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSkills_UserId",
                table: "UserSkills",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Communities_CommunityId",
                table: "Events",
                column: "CommunityId",
                principalTable: "Communities",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Skills_PumpingSkillId",
                table: "Events",
                column: "PumpingSkillId",
                principalTable: "Skills",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectFiles_Files_FileId",
                table: "ProjectFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectFiles_Projects_ProjectId",
                table: "ProjectFiles",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFiles_Files_FileId",
                table: "UserFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFiles_Users_UserId",
                table: "UserFiles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Communities_CommunityId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Skills_PumpingSkillId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectFiles_Files_FileId",
                table: "ProjectFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectFiles_Projects_ProjectId",
                table: "ProjectFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFiles_Files_FileId",
                table: "UserFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFiles_Users_UserId",
                table: "UserFiles");

            migrationBuilder.DropTable(
                name: "CommunityFiles");

            migrationBuilder.DropTable(
                name: "CommunityTeams");

            migrationBuilder.DropTable(
                name: "EventTrainerSkills");

            migrationBuilder.DropTable(
                name: "ProjectRewardTemplates");

            migrationBuilder.DropTable(
                name: "RewardSkillExperiences");

            migrationBuilder.DropTable(
                name: "TrainerVisits");

            migrationBuilder.DropTable(
                name: "UserSkills");

            migrationBuilder.DropTable(
                name: "Communities");

            migrationBuilder.DropTable(
                name: "Rewards");

            migrationBuilder.DropTable(
                name: "Skills");

            migrationBuilder.DropTable(
                name: "RewardTemplates");

            migrationBuilder.DropIndex(
                name: "IX_Events_CommunityId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_PumpingSkillId",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserFiles",
                table: "UserFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectFiles",
                table: "ProjectFiles");

            migrationBuilder.DropIndex(
                name: "IX_ProjectFiles_ProjectId",
                table: "ProjectFiles");

            migrationBuilder.DropColumn(
                name: "CommunityId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "PumpingSkillId",
                table: "Events");

            migrationBuilder.RenameTable(
                name: "UserFiles",
                newName: "UserFileEntity");

            migrationBuilder.RenameTable(
                name: "ProjectFiles",
                newName: "ProjectFileEntity");

            migrationBuilder.RenameIndex(
                name: "IX_UserFiles_UserId",
                table: "UserFileEntity",
                newName: "IX_UserFileEntity_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserFiles_FileId",
                table: "UserFileEntity",
                newName: "IX_UserFileEntity_FileId");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "ProjectFileEntity",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectFiles_FileId",
                table: "ProjectFileEntity",
                newName: "IX_ProjectFileEntity_FileId");

            migrationBuilder.AddColumn<int>(
                name: "FileId1",
                table: "ProjectFileEntity",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserFileEntity",
                table: "UserFileEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectFileEntity",
                table: "ProjectFileEntity",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectFileEntity_FileId1",
                table: "ProjectFileEntity",
                column: "FileId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectFileEntity_Files_FileId1",
                table: "ProjectFileEntity",
                column: "FileId1",
                principalTable: "Files",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectFileEntity_Projects_FileId",
                table: "ProjectFileEntity",
                column: "FileId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFileEntity_Files_FileId",
                table: "UserFileEntity",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFileEntity_Users_UserId",
                table: "UserFileEntity",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
