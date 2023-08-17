import * as Icons from "../icons";
import { queries } from "./Fetching";


export const defaultVisibleColumns = [
  "tag", "title", "cod", "tag_cod", "descripcion", "funcion"
]

export const BodyStaticAPP = [
  {
    icon: <Icons.IconHome className="w-8 h-8 text-gray-500" />,
    title: "inicio",
    roles: ["all"],
    slug: "/",
    //getData: queries.getSections,
    //getByID: FetchGraphQL.business.getOneBusiness,
    //createEntry: FetchGraphQL.business.createBusiness,
    //updateEntry: FetchGraphQL.business.updateBusiness,
    //deleteEntry: FetchGraphQL.business.deleteBusiness,
    schema: [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Nombre de empresa",
        accessor: "businessName",
        type: "textareaSizable",
        required: true,
      }
    ]
  },
  {
    icon: <Icons.IconSetions className="w-8 h-8 text-gray-500" />,
    title: "secciones de la planta",
    roles: ["all"],
    slug: "/plantSections",
    getData: queries.getSections,
    //getByID: FetchGraphQL.business.getOneBusiness,
    //createEntry: FetchGraphQL.business.createBusiness,
    //updateEntry: FetchGraphQL.business.updateBusiness,
    //deleteEntry: FetchGraphQL.business.deleteBusiness,
    schema: [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Nombre de empresa",
        accessor: "businessName",
        type: "textareaSizable",
        required: true,
      }
    ]
  },
  {
    icon: <Icons.IconEquipment className="w-8 h-8 text-gray-500" />,
    title: "equipos de proceso",
    roles: ["all"],
    slug: "/processEquipment",
    getData: queries.getEquipments,
    schema: [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Nombre de empresa",
        accessor: "businessName",
        type: "textareaSizable",
        required: true,
      }
    ]
  },
  {
    icon: <Icons.IconScrewdriverWrench className="w-8 h-8 text-gray-500" />,
    title: "maestro de repuestos",
    roles: ["all"],
    slug: "/replacementsMasters",
    getData: queries.getReplacementsMasters,
    schema: [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Nombre de empresa",
        accessor: "businessName",
        type: "textareaSizable",
        required: true,
      }
    ]
  },
  {
    icon: <Icons.IconStateMachine className="w-8 h-8 text-gray-500" />,
    title: "maestro de equipos",
    roles: ["all"],
    slug: "/equipmentsMasters",
    getData: queries.getEquipmentsMasters,
    schema: [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Nombre de empresa",
        accessor: "businessName",
        type: "textareaSizable",
        required: true,
      }
    ]
  },
]