package benefitCategory

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.BenefitCategories) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.BenefitCategories, error)
	Detail(db *gorm.DB, id string) (*model.BenefitCategories, error)
	Update(db *gorm.DB, id string, e *model.BenefitCategories) error
	Delete(db *gorm.DB, id string) error
}
