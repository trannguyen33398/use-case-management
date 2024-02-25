package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateBundleResponse struct {
	Data *Bundle `json:"data"`
}

type Bundle struct {
	Id          string      `json:"id"`
	Name        string      `json:"name"`
	Description string `json:"description"`
	CreatedAt   string      `json:"createdAt"`
	UpdatedAt   string      `json:"updatedAt"`
	UseCases  []UseCasesMapping `json:"useCases"`
}

func ToBundle(bundle *model.Bundles) *Bundle {
	
	useCases := make([]UseCasesMapping,0)
	

	for _, v:= range bundle.UseCases{
		temp := UseCasesMapping{
			Id: v.UseCasesId.String(), 
			Name: v.UseCase.Name,
		}
		
		useCases =append(useCases,temp)
	}

	

	return &Bundle{
		Id:          bundle.ID.String(),
		CreatedAt:   bundle.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:   bundle.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:        bundle.Name,
		Description: bundle.Description,
		UseCases: useCases,
	}
}

func ToBundles( bundles []*model.Bundles) []Bundle {
	rs := make([]Bundle, 0, len(bundles))
	for _, bundle := range bundles {
		c := ToBundle(bundle)
		if c != nil {
			rs = append(rs, *c)
		}
	}
	return rs
}
