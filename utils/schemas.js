import * as Icons from "../icons";
import { BsShieldLockFill, BsIntersect } from 'react-icons/bs';
import { RiShieldUserLine } from 'react-icons/ri';
import { HiUserGroup, HiUserCircle } from 'react-icons/hi';
import { VscGroupByRefType } from 'react-icons/vsc';
import { AiFillSetting } from 'react-icons/ai';
import { GrCodeSandbox } from 'react-icons/gr';
import { FiLogOut } from 'react-icons/fi';
import { queries } from "./Fetching";
import { MdOutlineManageAccounts, MdOutlineCleaningServices, MdOutlineAccountTree } from 'react-icons/md';
import { PiPassword } from 'react-icons/pi';
import { FaTasks } from 'react-icons/fa';
import { TbChartInfographic, TbReportSearch } from 'react-icons/tb';
import { BiTask } from 'react-icons/bi';
import { LiaMedalSolid } from 'react-icons/lia';
import { BiCategory, BiAbacus } from 'react-icons/bi';
import { elements } from "./schemaElements.js"
import { tagsGroups } from "./schemaCoordinations.js"
import { VscTools } from "react-icons/vsc"
import { InDevelopment } from "../components/InDevelopment";
import { CalendarCompont } from "../components/CalendarCompont";
import { ChangePasssword } from "../components/ChangePassword";


export const defaultVisibleColumns = [
  "codigo", "tag", "tipo", "title", "cod", "tag_cod", "descripcion", "funcion", "name", "email", "phone", "roles", "permissions", "type", "groups", "phone", "position", "father"
]

export const BodyStaticAPP = [
  {
    icon: < Icons.IconHome className="w-8 h-8 text-gray-500" />,
    title: "inicio",
    groups: ["all"],
    slug: "/",
  },
  {
    icon: <MdOutlineAccountTree className="w-8 h-8 text-gray-500" />,
    title: "estructura",
    groups: ["development", "admin"],
    slug: "/structure",
  },
  {
    icon: <BsIntersect className="w-8 h-8 text-gray-500" />,
    title: "secciones de la planta",
    groups: ["development"],
    slug: "/plantSections",
    sortData: { tag: 1 },
    getData: queries.getSections,
    //getByID: FetchGraphQL.business.getOneBusiness,
    createEntry: queries.createSections,
    //updateEntry: FetchGraphQL.business.updateBusiness,
    //deleteEntry: FetchGraphQL.business.deleteBusiness,
    schema: [
      {
        Header: "tag",
        accessor: "tag",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "nombre",
        accessor: "title",
        type: "text",
        required: true,
        size: 3
      },
      {
        Header: "id",
        accessor: "_id",
        type: "id",
      }
    ]
  },
  {
    icon: <Icons.IconEquipment className="w-8 h-8 text-gray-500" />,
    title: "equipos de proceso",
    groups: ["development"],
    slug: "/processEquipment",
    sortData: { tag: 1 },
    getData: queries.getEquipments,
    createEntry: queries.createEquipments,
    schema: [
      {
        Header: "tag",
        accessor: "tag",
        type: "text",
        required: true,
        size: 1
      },
      {
        Header: "nombre",
        accessor: "title",
        type: "text",
        required: true,
        size: 3
      },
      {
        Header: "id",
        accessor: "_id",
        type: "id",
      }
    ]
  },
  {
    icon: <Icons.IconScrewdriverWrench className="w-8 h-8 text-gray-500" />,
    title: "maestro de repuestos",
    groups: ["development"],
    slug: "/replacementsMasters",
    sortData: { tag: 1 },
    getData: queries.getReplacementsMasters,
    createEntry: queries.createReplacementsMasters,
    schema: [
      {
        Header: "código",
        accessor: "cod",
        type: "text",
        required: true,
        size: 1
      },
      {
        Header: "nombre",
        accessor: "title",
        type: "text",
        required: true,
        size: 3
      },
      {
        Header: "descripcion",
        accessor: "descripcion",
        type: "text",
        required: false,
        size: 3
      },
      {
        Header: "componente",
        accessor: "componente",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "tag_cod",
        accessor: "tag_cod",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "cantidad",
        accessor: "cantidad",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "id",
        accessor: "_id",
        type: "id",
      }
    ]
  },
  {
    icon: <Icons.IconStateMachine className="w-8 h-8 text-gray-500" />,
    title: "maestro de equipos",
    groups: ["development"],
    slug: "/equipmentsMasters",
    sortData: { tag: 1 },
    getData: queries.getEquipmentsMasters,
    createEntry: queries.createEquipmentsMasters,
    schema: [
      {
        Header: "tag_cod",
        accessor: "tag_cod",
        type: "text",
        required: true,
        size: 1
      },
      {
        Header: "title",
        accessor: "title",
        type: "text",
        required: true,
        size: 3
      },
      {
        Header: "funcion",
        accessor: "funcion",
        type: "text",
        required: false,
        size: 3
      },
      {
        Header: "ubicacion",
        accessor: "ubicacion",
        type: "select",
        ref: {
          table: "plantSections",
          accesor: "title"
        },
        required: false,
        size: 2
      },
      {
        Header: "horas_servicio_teorico",
        accessor: "horas_servicio_teorico",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "fecha_ult_mtto",
        accessor: "fecha_ult_mtto",
        type: "datetime-local",
        required: false,
        size: 1
      },
      {
        Header: "marca",
        accessor: "marca",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "modelo",
        accessor: "modelo",
        type: "text",
        required: false,
        size: 1
      },

      {
        Header: "tipo",
        accessor: "tipo",
        type: "select",
        ref: {
          table: "processEquipment",
          accessor: "title"
        },
        required: false,
        size: 1
      },
      {
        Header: "largo",
        accessor: "largo",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "alto",
        accessor: "alto",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "ancho",
        accessor: "ancho",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "potencia",
        accessor: "potencia",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "voltaje",
        accessor: "voltaje",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "amperaje (a)",
        accessor: "amperaje_a",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "corriente",
        accessor: "corriente",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "rpm",
        accessor: "rpm",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "frecuencia",
        accessor: "frecuencia",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "rodamiento 1",
        accessor: "rodamiento_1",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "rodamiento 2",
        accessor: "rodamiento_2",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "estopera",
        accessor: "estopera",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "capacidad",
        accessor: "capacidad",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "material",
        accessor: "material",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "espesor lamina",
        accessor: "espesor_lamina",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "peso (kg)",
        accessor: "peso_kg",
        type: "number",
        required: false,
        size: 1
      },
      {
        Header: "serial",
        accessor: "serial",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "grasa o lubricante",
        accessor: "grasa_lubricante",
        type: "text",
        required: false,
        size: 1
      },
      {
        Header: "observaciones",
        accessor: "observaciones",
        type: "text",
        required: false,
        size: 3
      },
      {
        Header: "id",
        accessor: "_id",
        type: "id",
      }
    ]
  },
  {
    icon: <VscTools className="w-8 h-8 text-gray-500" />,
    title: "mantenimiento",
    groups: ["development", "admin", "coordinador de mantenimiento", "supervisor de mantenimiento", "obrero servicios generales"],
    slug: "/maintenance",
    //component: <InDevelopment />,
    subMenu: [
      {
        icon: <FaTasks className="w-8 h-8 text-gray-500" />,
        title: "tareas departamento",
        groups: ["development", "admin", "coordinador de mantenimiento", "supervisor de mantenimiento"],
        slug: "/maintenance/alltasks",
        component: <CalendarCompont />,
      },
      {
        icon: <TbChartInfographic className="w-8 h-8 text-gray-500" />,
        title: "graficos",
        groups: ["development", "admin", "coordinador de mantenimiento"],
        slug: "/maintenance/dashboards",
        component: <InDevelopment />,
      },
      {
        icon: <TbReportSearch className="w-8 h-8 text-gray-500" />,
        title: "reportes",
        groups: ["development", "admin", "coordinador de mantenimiento", "supervisor de mantenimiento"],
        slug: "/maintenance/reports",
        component: <InDevelopment />,
      },
      {
        icon: <BiTask className="w-8 h-8 text-gray-500" />,
        title: "tareas",
        groups: ["development", "admin", "supervisor de mantenimiento", "obrero servicios generales"],
        filterUser: true,
        slug: "/maintenance/tasks",
        component: <CalendarCompont />,
      },
      {
        icon: <LiaMedalSolid className="w-8 h-8 text-gray-500" />,
        title: "evaluación tareas",
        groups: ["development", "admin", "supervisor",],
        slug: "/maintenance/evaluation",
        component: <InDevelopment />,
      },
    ]
  },
  {
    icon: <MdOutlineCleaningServices className="w-8 h-8 text-gray-500" />,
    title: "servicios generales",
    groups: ["development", "admin", "coordinador de mantenimiento", "supervisor de servicios generales", "obrero servicios generales"],
    slug: "/cleaning",
    //component: <InDevelopment />,
    subMenu: [
      {
        icon: <FaTasks className="w-8 h-8 text-gray-500" />,
        title: "tareas departamento",
        groups: ["development", "admin", "coordinador de mantenimiento", "supervisor de servicios generales"],
        slug: "/cleaning/alltasks",
        component: <CalendarCompont />,
      },
      {
        icon: <TbChartInfographic className="w-8 h-8 text-gray-500" />,
        title: "graficos",
        groups: ["development", "admin", "coordinador de mantenimiento"],
        slug: "/cleaning/dashboards",
        component: <InDevelopment />,
      },
      {
        icon: <TbReportSearch className="w-8 h-8 text-gray-500" />,
        title: "reportes",
        groups: ["development", "admin", "coordinador de mantenimiento", "supervisor de servicios generales"],
        slug: "/cleaning/reports",
        component: <InDevelopment />,
      },
      {
        icon: <BiTask className="w-8 h-8 text-gray-500" />,
        title: "tareas",
        groups: ["development", "admin", "supervisor de servicios generales", "obrero servicios generales"],
        filterUser: true,
        slug: "/cleaning/tasks",
        component: <CalendarCompont />,
      },
      {
        icon: <LiaMedalSolid className="w-8 h-8 text-gray-500" />,
        title: "evaluación tareas",
        groups: ["development", "admin", "supervisor",],
        slug: "/cleaning/evaluation",
        component: <InDevelopment />,
      },
    ]
  },
  {
    icon: <AiFillSetting className="w-8 h-8 text-gray-500" />,
    title: "configuración",
    groups: ["development", "admin", "coordinador de mantenimiento"],
    slug: "/setup",
    position: "bottom",
    subMenu: [
      ...elements,
      {
        icon: <BiCategory className="w-8 h-8 text-gray-500" />,
        title: "propiedades",
        groups: ["development", "admin"],
        slug: "/setup/properties",
        sortData: { title: 1 },
        getData: queries.getProperties,
        schema: [
          {
            Header: "nombre",
            accessor: "title",
            type: "text",
            required: true,
            size: 3
          },
          {
            Header: "id",
            accessor: "_id",
            type: "id",
          }
        ]
      },
      {
        icon: <BiAbacus className="w-8 h-8 text-gray-500" />,
        title: "características",
        groups: ["development", "admin"],
        slug: "/setup/characteristics",
        sortData: {},
        getData: queries.getCharacteristics,
        schema: [
          {
            Header: "nombre",
            accessor: "title",
            type: "text",
            required: true,
            size: 3
          },
          {
            Header: "id",
            accessor: "_id",
            type: "id",
          }
        ]
      },
      {
        icon: <GrCodeSandbox className="w-6 h-8 text-gray-500" />,
        title: "variables",
        groups: ["development"],
        slug: "/setup/variables",
        sortData: { tag: 1 },
        getData: queries.getVariables,
        createEntry: queries.createVariables,
        updateEntry: queries.updateVariable,
        schema: [
          {
            Header: "código",
            accessor: "tag",
            type: "text",
            required: true,
            size: 3
          },
          {
            Header: "nombre",
            accessor: "title",
            type: "text",
            required: true,
            size: 3
          },
          {
            Header: "tipo",
            accessor: "type",
            type: "text",
            required: false,
            size: 3
          },
          {
            Header: "id",
            accessor: "_id",
            type: "id",
          }
        ]
      },
    ],

  },
  {
    icon: <BsShieldLockFill className="w-8 h-8 text-gray-500" />,
    title: "seguridad",
    groups: ["development", "admin"],
    slug: "/security",
    position: "bottom",
    subMenu: [
      {
        icon: <RiShieldUserLine className="w-8 h-8 text-gray-500" />,
        title: "usuarios",
        groups: ["development", "admin"],
        slug: "/security/users",
        sortData: { name: 1 },
        getData: queries.getUser,
        createEntry: queries.createUsers,
        updateEntry: queries.updateUser,
        schema: [
          {
            Header: "correo",
            accessor: "email",
            type: "text",
            required: true,
            readOnly: true,
            size: 2
          },
          {
            Header: "contraseña",
            accessor: "password",
            type: "text",
            required: true,
            size: 1
          },
          {
            Header: "nombre",
            accessor: "name",
            type: "text",
            required: true,
            size: 2
          },
          {
            Header: "cargo",
            accessor: "position",
            type: "text",
            required: true,
            size: 2
          },
          {
            Header: "teléfono",
            accessor: "phone",
            type: "text",
            required: false,
            size: 2
          },
          {
            Header: "grupos de permisos",
            accessor: "groups",
            type: "checkbox",
            subType: "group",
            required: false,
            size: 3,
            getOptions: queries.getGroups,
          },
          {
            Header: "id",
            accessor: "_id",
            type: "id",
          }
        ]
      },
      {
        icon: <HiUserGroup className="w-8 h-8 text-gray-500" />,
        title: "grupos",
        groups: ["development", "admin"],
        slug: "/security/group",
        sortData: { title: 1 },
        getData: queries.getGroups,
        createEntry: queries.createGroups,
        updateEntry: queries.updateGroups,
        schema: [
          {
            Header: "tag",
            accessor: "tag",
            type: "select",
            options: tagsGroups.map(elem => { return { value: elem, label: elem.toUpperCase() } }),
            required: true,
            size: 2
          },
          {
            Header: "nombre",
            accessor: "title",
            type: "text",
            required: true,
            size: 3
          },
          {
            Header: "permisos",
            accessor: "permissions",
            type: "checkbox",
            required: false,
            size: 3,
            getOptions: queries.getPermissions,
          },
          {
            Header: "id",
            accessor: "_id",
            type: "id",
          }
        ]
      },
      {
        icon: <VscGroupByRefType className="w-8 h-8 text-gray-500" />,
        title: "permisos",
        groups: ["development", "admin"],
        slug: "/security/permission",
        getData: queries.getPermissions,
        createEntry: queries.createPermissions,
        updateEntry: queries.updatePermissions,
        schema: [
          // {
          //   Header: "tag",
          //   accessor: "tag",
          //   type: "text",
          //   required: true,
          //   size: 3
          // },
          {
            Header: "permiso",
            accessor: "title",
            type: "text",
            required: true,
            size: 3
          },
          {
            Header: "id",
            accessor: "_id",
            type: "id",
          }
        ]
      },
    ],
  },
  {
    icon: <HiUserCircle className="w-8 h-8 text-gray-500" />,
    title: "{{user.displayName}}",
    groups: ["all"],
    slug: "/profile",
    position: "bottom",
    //component: <InDevelopment />,
    subMenu: [
      {
        icon: <MdOutlineManageAccounts className="w-10 h-10 text-gray-500" />,
        title: "preferencias",
        groups: ["all"],
        slug: "/profile/perfil",
        component: <InDevelopment />,
        schema: [
          {
            Header: "nombre",
            accessor: "name",
            type: "text",
            required: true,
            size: 2
          },
        ]
      },
      {
        icon: <PiPassword className="w-8 h-8 text-gray-500" />,
        title: "cambiar contraseña",
        groups: ["all"],
        slug: "/profile/passwords",
        component: <ChangePasssword />,
      },
      {
        icon: <FiLogOut className="w-8 h-8 text-gray-500" />,
        title: "desconectar",
        groups: ["all"],
        logout: true,
        schema: [
          {
            Header: "nombre",
            accessor: "name",
            type: "text",
            required: true,
            size: 2
          },
        ]
      }
    ]
  }

]

