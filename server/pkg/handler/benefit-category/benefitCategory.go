package benefitCategory

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/config"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/benefit-category/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/logger"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/view"
)

type handler struct {
	store      *store.Store
	logger     logger.Logger
	repo       store.DBRepo
	config     *config.Config
	controller *controller.Controller
}

// New returns a handler
func New(controller *controller.Controller, store *store.Store, repo store.DBRepo, logger logger.Logger, cfg *config.Config) IHandler {
	return &handler{
		store:      store,
		repo:       repo,
		logger:     logger,
		config:     cfg,
		controller: controller,
	}
}

type SuccessResult struct {
	message string
}

func (h *handler) Create(c *gin.Context) {
	input := request.CreateBenefitCategoryRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	validateError := view.ValidateRequest(input)

	if len(validateError) > 0 {

		c.JSON(http.StatusBadRequest, validateError)
		return
	}

	l := h.logger.Fields(logger.Fields{
		"handler": "benefitCategory",
		"method":  "Create",
		"request": input,
	})

	err := h.controller.BenefitCategory.Create(c, input)

	if err != nil {
		l.Error(err, "failed to create Benefit Category")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	c.Status(http.StatusCreated)
	return
}

func (h *handler) List(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "benefitCategory",
		"method":  "List",
	})

	total, benefitCategories, err := h.controller.BenefitCategory.List(c)
	if err != nil {
		l.Error(err, "failed to get Benefit Category list")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToBenefitCategories(benefitCategories), &view.PaginationResponse{Total: total}, nil, nil, ""))
}

func (h *handler) Detail(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "benefitCategory",
		"method":  "Detail",
	})

	benefitCategory, err := h.controller.BenefitCategory.Detail(c)
	if err != nil {
		l.Error(err, "failed to get Communication Stream detail")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToBenefitCategory(benefitCategory), nil, nil, nil, ""))
}

func (h *handler) Update(c *gin.Context) {
	input := request.CreateBenefitCategoryRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}
	l := h.logger.Fields(logger.Fields{
		"handler": "benefitCategory",
		"method":  "Update",
	})
	validateError := view.ValidateRequest(input)

	if len(validateError) > 0 {

		c.JSON(http.StatusBadRequest, validateError)
		return
	}

	err := h.controller.BenefitCategory.Update(c, input)
	if err != nil {
		l.Error(err, "failed to update Benefit Category")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}

func (h *handler) Delete(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "benefitCategory",
		"method":  "Delete",
	})

	err := h.controller.BenefitCategory.Delete(c)
	if err != nil {
		l.Error(err, "failed to delete Benefit Category")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}
