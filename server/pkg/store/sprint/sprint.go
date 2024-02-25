package sprint

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new bundle
func (s *store) Create(db *gorm.DB, e *model.Sprints) (err error) {
	return db.Create(e).Error
}

// Get list bundle
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Sprints, error) {
	var bundle []*model.Sprints
	var totalRows int64

	db.Model(bundle).Where(`sprints.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("UseCases.UseCase").
	Preload("Bundle").
	Where(`sprints.name like ?`, "%"+name+"%").
	Offset(limit * (page - 1)).
	Limit(limit).
	Order("sprints.created_at desc")

	return totalRows, bundle, query.Find(&bundle).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Sprints, error) {
	var bundle *model.Sprints

	query := db.Preload("Bundle").
	Preload("UseCases.UseCase").
	Where(`sprints.id = ?`, id)

	return bundle, query.First(&bundle).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.Sprints) error {
	var bundle *model.Sprints
	var UseCases *model.SprintsToUseCases
	
	updateData.UpdatedAt = time.Now()
	query := db.Where(`sprints.id = ?`, id).
	Omit("UseCases").
	UpdateColumns(updateData)

	db.Model(&UseCases).Where(`sprints_id = ?`, id).Delete(&UseCases)
	
	db.Model(&UseCases).Create(updateData.UseCases)
 

	return query.UpdateColumns(&bundle).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var bundle *model.Sprints

	query := db.Where(`sprints.id = ?`, id)

	return query.Delete(&bundle).Error
}
