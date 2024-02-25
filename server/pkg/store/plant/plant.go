package plant

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new plant
func (s *store) Create(db *gorm.DB, e *model.Plants) (err error) {
	return db.Create(e).Error
}

// Get list plant
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Plants, error) {
	var plant []*model.Plants
	var totalRows int64

	db.Model(plant).Where(`plants.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("PlantParent").
		Where(`plants.name like ?`, "%"+name+"%").Offset(limit * (page - 1)).Limit(limit).Order("plants.created_at desc")

	return totalRows, plant, query.Find(&plant).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Plants, error) {
	var plant *model.Plants

	query := db.Preload("PlantParent").Where(`plants.id = ?`, id)

	return plant, query.First(&plant).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.Plants) error {
	var plant *model.Plants
	updateData.UpdatedAt = time.Now()
	query := db.Where(`plants.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&plant).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var plant *model.Plants

	query := db.Where(`plants.id = ?`, id)

	return query.Delete(&plant).Error
}
