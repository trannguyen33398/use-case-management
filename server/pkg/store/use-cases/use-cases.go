package useCases

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new UseCases
func (s *store) Create(db *gorm.DB, e *model.UseCases) (errs error) {
	return db.Create(e).Error
}

// Get list UseCases
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.UseCases, error) {
	var UseCases []*model.UseCases
	var totalRows int64

	db.Model(UseCases).Where(`use_cases.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Model(&UseCases).
	Preload("Process").
	Preload("ProcessParent").
	Preload("Plant").
	Preload("Risks.Risk").
	Preload("Machines.Machine").
	Preload("ServiceLines.ServiceLine").
	Preload("BlockingPointsToServiceLines.ServiceLine").
	Preload("Systems.System").
	Preload("UseCaseClusters.UseCaseCluster").
	Preload("CommunicationStreams.CommunicationStream").
	Where(`use_cases.name like ?`, "%"+name+"%").Offset(limit * (page - 1)).Limit(limit).Order("use_cases.created_at desc")

	return totalRows, UseCases, query.Find(&UseCases).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.UseCases, error) {
	var UseCases *model.UseCases

	query := db.Model(&UseCases).
	Preload("Process").
	Preload("UseCasesParent").
	Preload("ProcessParent").
	Preload("Plant").
	Preload("Risks.Risk").
	Preload("Machines.Machine").
	Preload("ServiceLines.ServiceLine").
	Preload("BlockingPointsToServiceLines.ServiceLine").
	Preload("Systems.System").
	Preload("UseCaseClusters.UseCaseCluster").
	Preload("CommunicationStreams.CommunicationStream").
	Where("use_cases.id = ?", id)

	return UseCases, query.First(&UseCases).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.UseCases) error {
	var UseCases *model.UseCases
	var Risks *model.UseCasesToRisks
	var Machines *model.UseCasesToMachines
	var CommunicationStreams *model.UseCasesToCommunicationStreams
	var ServiceLines *model.UseCasesToServiceLines
	var BlockingPointsToServiceLines *model.UseCasesBlockingPointsToServiceLines
	var Systems *model.UseCasesToSystems
	var UseCaseClusters *model.UseCasesToUseCaseClusters
	
	updateData.UpdatedAt = time.Now()

	query := db.Where(`use_cases.id = ?`, id).
	Omit("Risks",
	"Machines",
	"CommunicationStreams",
	"ServiceLines",
	"BlockingPointsToServiceLines",
	"Systems",
	"UseCaseClusters",
	).UpdateColumns(updateData)

	db.Model(&Risks).Where(`use_cases_id = ?`, id).Delete(&Risks)
	db.Model(&Machines).Where(`use_cases_id = ?`, id).Delete(&Machines)
	db.Model(&CommunicationStreams).Where(`use_cases_id = ?`, id).Delete(&CommunicationStreams)
	db.Model(&ServiceLines).Where(`use_cases_id = ?`, id).Delete(&ServiceLines)
	db.Model(&BlockingPointsToServiceLines).Where(`use_cases_id = ?`, id).Delete(&BlockingPointsToServiceLines)
	db.Model(&Systems).Where(`use_cases_id = ?`, id).Delete(&Systems)
	db.Model(&UseCaseClusters).Where(`use_cases_id = ?`, id).Delete(&UseCaseClusters)


	db.Model(&Risks).Create(updateData.Risks)
	db.Model(&Machines).Create(updateData.Machines)
	db.Model(&CommunicationStreams).Create(updateData.CommunicationStreams)
	db.Model(&ServiceLines).Create(updateData.ServiceLines)
	db.Model(&BlockingPointsToServiceLines).Create(updateData.BlockingPointsToServiceLines)
	db.Model(&Systems).Create(updateData.Systems)
	db.Model(&UseCaseClusters).Create(updateData.UseCaseClusters)

	return query.UpdateColumns(&UseCases).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var UseCases *model.UseCases

	query := db.Where(`use_case_cluster.id = ?`, id)

	return query.Delete(&UseCases).Error
}
