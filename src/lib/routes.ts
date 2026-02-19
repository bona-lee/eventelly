// Centralized route definitions for the Eventelly admin app.
// Every leaf is a () => string function. Import and use:
//   import { routes, routeSegments } from '@/lib/routes'
//   const ws = routes.workspace(workspaceId)
//   const ev = ws.event(eventId)

const workspace = (workspaceId: string) => {
  const base = `/workspace/${workspaceId}`

  return {
    root: () => base,

    events: {
      all: () => `${base}/events/all`,
      series: {
        list: () => `${base}/events/series`,
        detail: (seriesId: string) => `${base}/events/series/${seriesId}`,
      },
    },

    users: {
      all: () => `${base}/users/all`,
      companies: () => `${base}/users/companies`,
      signupForms: () => `${base}/users/signup-forms`,
      terms: () => `${base}/users/terms`,
    },

    team: {
      members: {
        list: () => `${base}/team/members`,
        detail: (memberId: string) => `${base}/team/members/${memberId}`,
      },
      groups: {
        list: () => `${base}/team/groups`,
        detail: (groupId: string) => `${base}/team/groups/${groupId}`,
      },
      roles: () => `${base}/team/roles`,
    },

    settings: {
      dataFields: () => `${base}/settings/data-fields`,
      localization: () => `${base}/settings/localization`,
    },

    billing: {
      root: () => `${base}/billing`,
      usage: () => `${base}/billing/usage`,
      methods: () => `${base}/billing/methods`,
      history: () => `${base}/billing/history`,
    },

    event: (eventId: string) => {
      const ev = `${base}/event/${eventId}`

      return {
        root: () => ev,

        operations: {
          participants: {
            all: {
              individuals: () => `${ev}/operations/participants/all/individuals`,
              companies: () => `${ev}/operations/participants/all/companies`,
            },
            marketing: {
              leads: () => `${ev}/operations/participants/marketing/leads`,
              newsletter: () => `${ev}/operations/participants/marketing/newsletter`,
            },
          },
          registration: {
            registrations: {
              all: () => `${ev}/operations/registration/registrations/all`,
            },
            tickets: {
              orders: () => `${ev}/operations/registration/tickets/orders`,
            },
            accessCodes: {
              usage: () => `${ev}/operations/registration/access-codes/usage`,
              inventory: () => `${ev}/operations/registration/access-codes/inventory`,
            },
          },
          exhibition: {
            exhibitors: {
              applications: () => `${ev}/operations/exhibition/exhibitors/applications`,
              booths: () => `${ev}/operations/exhibition/exhibitors/booths`,
              services: () => `${ev}/operations/exhibition/exhibitors/services`,
              profiles: () => `${ev}/operations/exhibition/exhibitors/profiles`,
              products: () => `${ev}/operations/exhibition/exhibitors/products`,
            },
            invoicing: {
              issue: () => `${ev}/operations/exhibition/invoicing/issue`,
              records: () => `${ev}/operations/exhibition/invoicing/records`,
            },
          },
          meetings: {
            participants: {
              all: () => `${ev}/operations/meetings/participants/all`,
            },
            scheduling: {
              availability: () => `${ev}/operations/meetings/scheduling/availability`,
              auto: () => `${ev}/operations/meetings/scheduling/auto`,
              manual: () => `${ev}/operations/meetings/scheduling/manual`,
            },
            results: {
              schedule: () => `${ev}/operations/meetings/results/schedule`,
              meetings: () => `${ev}/operations/meetings/results/meetings`,
              waiting: () => `${ev}/operations/meetings/results/waiting`,
              consultationReports: () => `${ev}/operations/meetings/results/consultation-reports`,
            },
          },
          extraForms: {
            submissions: {
              all: () => `${ev}/operations/extra-forms/submissions/all`,
            },
          },
        },

        settings: {
          main: {
            exhibition: () => `${ev}/settings/main/exhibition`,
            tickets: () => `${ev}/settings/main/tickets`,
            accessCodes: () => `${ev}/settings/main/access-codes`,
            sessions: () => `${ev}/settings/main/sessions`,
            meetings: () => `${ev}/settings/main/meetings`,
            extraForms: () => `${ev}/settings/main/extra-forms`,
            newsletter: () => `${ev}/settings/main/newsletter`,
          },
          forms: {
            registration: () => `${ev}/settings/forms/registration`,
            terms: () => `${ev}/settings/forms/terms`,
          },
          communication: {
            templates: () => `${ev}/settings/communication/templates`,
            scheduled: () => `${ev}/settings/communication/scheduled`,
            history: () => `${ev}/settings/communication/history`,
          },
          design: {
            theme: () => `${ev}/settings/design/theme`,
            pages: () => `${ev}/settings/design/pages`,
            sitemap: () => `${ev}/settings/design/sitemap`,
            platformTheme: () => `${ev}/settings/design/platform-theme`,
          },
          reports: {
            statistics: {
              overview: () => `${ev}/settings/reports/statistics/overview`,
              registrations: () => `${ev}/settings/reports/statistics/registrations`,
              exhibitions: () => `${ev}/settings/reports/statistics/exhibitions`,
              sessions: () => `${ev}/settings/reports/statistics/sessions`,
              meetings: () => `${ev}/settings/reports/statistics/meetings`,
            },
            analytics: {
              data: () => `${ev}/settings/reports/analytics/data`,
            },
          },
        },
      }
    },
  }
}

export const routes = {
  dashboard: () => '/dashboard',
  account: {
    profile: () => '/account/profile',
    password: () => '/account/password',
    emailPreferences: () => '/account/email-preferences',
  },
  workspace,
} as const

// Static path segments for pathname.includes() / startsWith() checks.
// No dynamic IDs — just the segment strings.
export const routeSegments = {
  events: '/events/',
  users: '/users/',
  team: '/team/',
  settings: '/settings/',
  billing: '/billing/',

  teamMembers: '/team/members',
  teamGroups: '/team/groups',
  teamRoles: '/team/roles',

  operationsParticipants: '/operations/participants/',
  operationsRegistration: '/operations/registration/',
  operationsExhibition: '/operations/exhibition/',
  operationsMeetings: '/operations/meetings/',
  operationsExtraForms: '/operations/extra-forms/',

  settingsMain: '/settings/main/',
  settingsForms: '/settings/forms/',
  settingsCommunication: '/settings/communication/',
  settingsDesign: '/settings/design/',
  settingsReports: '/settings/reports/',
} as const
