package bundle

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/config"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/bundle/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/logger"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store"
)

type controller struct {
	store  *store.Store
	logger logger.Logger
	repo   store.DBRepo
	config *config.Config
}

func New(store *store.Store, repo store.DBRepo, logger logger.Logger, cfg *config.Config) IController {
	return &controller{
		store:  store,
		repo:   repo,
		logger: logger,
		config: cfg,
	}
}

type IController interface {
	Create(c *gin.Context, input request.CreateBundleRequest) (err error)
	List(c *gin.Context) (total int64, bundle []*model.Bundles, err error)
	Detail(c *gin.Context) (bundle *model.Bundles, err error)
	Update(c *gin.Context, input request.CreateBundleRequest) (err error)
	Delete(c *gin.Context) (err error)
}
