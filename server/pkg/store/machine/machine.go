package machine

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new machine
func (s *store) Create(db *gorm.DB, e *model.Machines) (err error) {
	return db.Create(e).Error
}

// Get list machine
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Machines, error) {
	var machine []*model.Machines
	var totalRows int64

	db.Model(machine).Where(`machines.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("MachineParent").
		Where(`machines.name like ?`, "%"+name+"%").Offset(limit * (page - 1)).Limit(limit).Order("machines.created_at desc")

	return totalRows, machine, query.Find(&machine).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Machines, error) {
	var machine *model.Machines

	query := db.Preload("MachineParent").Where(`machines.id = ?`, id)

	return machine, query.First(&machine).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.Machines) error {
	var machine *model.Machines
	updateData.UpdatedAt = time.Now()
	query := db.Where(`machines.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&machine).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var machine *model.Machines

	query := db.Where(`machines.id = ?`, id)

	return query.Delete(&machine).Error
}
