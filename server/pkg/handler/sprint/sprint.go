package sprint

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/config"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/sprint/request"
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
	input := request.CreateSprintRequest{}
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
		"handler": "sprint",
		"method":  "Create",
		"request": input,
	})

	err := h.controller.Sprint.Create(c, input)

	if err != nil {
		l.Error(err, "failed to create Sprint")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	c.Status(http.StatusCreated)
	return
}

func (h *handler) List(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "sprint",
		"method":  "List",
	})

	total, sprints, err := h.controller.Sprint.List(c)
	if err != nil {
		l.Error(err, "failed to get Sprint list")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToSprints(sprints), &view.PaginationResponse{Total: total}, nil, nil, ""))
}

func (h *handler) Detail(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "sprint",
		"method":  "Detail",
	})

	sprint, err := h.controller.Sprint.Detail(c)
	if err != nil {
		l.Error(err, "failed to get Communication Stream detail")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToSprint(sprint), nil, nil, nil, ""))
}

func (h *handler) Update(c *gin.Context) {
	input := request.CreateSprintRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}
	l := h.logger.Fields(logger.Fields{
		"handler": "sprint",
		"method":  "Update",
	})
	validateError := view.ValidateRequest(input)

	if len(validateError) > 0 {

		c.JSON(http.StatusBadRequest, validateError)
		return
	}

	err := h.controller.Sprint.Update(c, input)
	if err != nil {
		l.Error(err, "failed to update Sprint")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}

func (h *handler) Delete(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "sprint",
		"method":  "Delete",
	})

	err := h.controller.Sprint.Delete(c)
	if err != nil {
		l.Error(err, "failed to delete Sprint")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}
