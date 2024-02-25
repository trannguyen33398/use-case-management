package view

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateSprintResponse struct {
	Data *Sprint `json:"data"`
}

type Sprint struct {
	Id                   string            `json:"id"`
	Name                 string            `json:"name"`
	Bundle               *model.Bundles    `json:"bundle"`
	PlannedFrom          *time.Time        `json:"plannedFrom"`
	PlannedTo            *time.Time        `json:"plannedTo"`
	BundleId             *model.UUID            `json:"bundleId"`
	BundleName           string            `json:"bundleName"`
	Step                 int32             `json:"step"`
	Description          string            `json:"description"`
	Status               string            `json:"status"`
	DevelopmentStatus    string            `json:"developmentStatus"`
	IterationStatus      string            `json:"iterationStatus"`
	ImplementationStatus string            `json:"implementationStatus"`
	HandoverStatus       string            `json:"handoverStatus"`
	ImplementedAt        *time.Time        `json:"implementedAt"`
	Documents            string            `json:"documents"`
	CreatedAt            string            `json:"createdAt"`
	UpdatedAt            string            `json:"updatedAt"`
	UseCases             []UseCasesMapping `json:"useCases"`
}

func ToSprint(sprint *model.Sprints) *Sprint {

	useCases := make([]UseCasesMapping, 0)

	for _, v := range sprint.UseCases {
		temp := UseCasesMapping{
			Id:   v.UseCasesId.String(),
			Name: v.UseCase.Name,
		}

		useCases = append(useCases, temp)
	}

	return &Sprint{
		Id:                   sprint.ID.String(),
		CreatedAt:            sprint.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:            sprint.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:                 sprint.Name,
		BundleId:             sprint.BundleId,
		BundleName: func() string {
			if sprint.Bundle == nil {
				return ""
			}
			return sprint.Bundle.Name
		}(),
		PlannedFrom:          sprint.PlannedFrom,
		PlannedTo:            sprint.PlannedTo,
		Step:                 sprint.Step,
		Description:          sprint.Description,
		Status:               sprint.Status,
		DevelopmentStatus:    sprint.DevelopmentStatus,
		IterationStatus:      sprint.ImplementationStatus,
		ImplementationStatus: sprint.ImplementationStatus,
		HandoverStatus:       sprint.HandoverStatus,
		ImplementedAt:        sprint.ImplementedAt,
		Documents:            sprint.Documents,
		UseCases:             useCases,
	}
}

func ToSprints(sprints []*model.Sprints) []Sprint {
	rs := make([]Sprint, 0, len(sprints))
	for _, sprint := range sprints {
		c := ToSprint(sprint)
		if c != nil {
			rs = append(rs, *c)
		}
	}
	return rs
}
