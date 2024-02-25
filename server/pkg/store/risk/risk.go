package risk

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new risk
func (s *store) Create(db *gorm.DB, e *model.Risks) (err error) {
	return db.Create(e).Error
}

// Get list risk
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Risks, error) {
	var risk []*model.Risks
	var totalRows int64

	db.Model(risk).Where(`risks.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("RiskParent").
		Where(`risks.name like ?`, "%"+name+"%").Offset(limit * (page - 1)).Limit(limit).Order("risks.created_at desc")

	return totalRows, risk, query.Find(&risk).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Risks, error) {
	var risk *model.Risks

	query := db.Preload("RiskParent").Where(`risks.id = ?`, id)

	return risk, query.First(&risk).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.Risks) error {
	var risk *model.Risks

	updateData.UpdatedAt = time.Now()
	query := db.Where(`risks.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&risk).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var risk *model.Risks

	query := db.Where(`risks.id = ?`, id)

	return query.Delete(&risk).Error
}
