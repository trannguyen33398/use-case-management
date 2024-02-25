package useCaseCluster

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.UseCaseCluster) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.UseCaseCluster, error)
	Detail(db *gorm.DB, id string) (*model.UseCaseCluster, error)
	Update(db *gorm.DB, id string, e *model.UseCaseCluster) error
	Delete(db *gorm.DB, id string) error
}
