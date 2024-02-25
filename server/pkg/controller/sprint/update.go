package sprint

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/sprint/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Update(c *gin.Context, input request.CreateSprintRequest) error {
	tx, done := r.repo.NewTransaction()
	sprintId, err :=  model.UUIDFromString(c.Param("sprintId"))
	
	if err != nil {
		 return done(err)
	}
	useCases := make([]model.SprintsToUseCases,0)
	

	for _, v:= range input.UseCases{
		temp := model.SprintsToUseCases{
			UseCasesId: v,
			SprintsID: sprintId,
			SprintsType: "sprints",
		}
		
		useCases =append(useCases,temp)
	}

	

	err = r.store.Sprint.Update(tx.DB(), c.Param("sprintId"), &model.Sprints{
		Name:        input.Name,
		BundleId:               input.BundleId,
		PlannedFrom:          input.PlannedFrom,
		PlannedTo:            input.PlannedTo,
		Step:                 input.Step,
		Description:          input.Description,
		Status:               input.Status,
		DevelopmentStatus:    input.DevelopmentStatus,
		IterationStatus:      input.ImplementationStatus,
		ImplementationStatus: input.ImplementationStatus,
		HandoverStatus:       input.HandoverStatus,
		ImplementedAt:        input.ImplementedAt,
		Documents:            input.Documents,
		UseCases: useCases,
	})

	if err != nil {
		return done(err)
	}

	return done(nil)
}
