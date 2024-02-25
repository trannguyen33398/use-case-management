package process

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new process
func (s *store) Create(db *gorm.DB, e *model.Processes) (err error) {
	return db.Create(e).Error
}

// Get list process
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Processes, error) {
	var process []*model.Processes
	var totalRows int64

	db.Model(process).Where(`processes.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("ProcessParent").
		Where(`processes.name like ?`, "%"+name+"%").Offset(limit * (page - 1)).Limit(limit).Order("processes.created_at desc")

	return totalRows, process, query.Find(&process).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Processes, error) {
	var process *model.Processes

	query := db.Preload("ProcessParent").Where(`processes.id = ?`, id)

	return process, query.First(&process).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.Processes) error {
	var process *model.Processes

	updateData.UpdatedAt = time.Now()
	query := db.Where(`processes.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&process).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var process *model.Processes

	query := db.Where(`processes.id = ?`, id)

	return query.Delete(&process).Error
}
