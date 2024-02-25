package serviceLine

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new serviceLine
func (s *store) Create(db *gorm.DB, e *model.ServiceLines) (err error) {
	return db.Create(e).Error
}

// Get list serviceLine
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.ServiceLines, error) {
	var serviceLine []*model.ServiceLines
	var totalRows int64

	db.Model(serviceLine).Where(`service_lines.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("ServiceLineParent").
		Where(`service_lines.name like ?`, "%"+name+"%").Offset(limit * (page - 1)).Limit(limit).Order("service_lines.created_at desc")

	return totalRows, serviceLine, query.Find(&serviceLine).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.ServiceLines, error) {
	var serviceLine *model.ServiceLines

	query := db.Preload("ServiceLineParent").Where(`service_lines.id = ?`, id)

	return serviceLine, query.First(&serviceLine).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.ServiceLines) error {
	var serviceLine *model.ServiceLines

	updateData.UpdatedAt = time.Now()
	query := db.Where(`service_lines.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&serviceLine).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var serviceLine *model.ServiceLines

	query := db.Where(`service_lines.id = ?`, id)

	return query.Delete(&serviceLine).Error
}
