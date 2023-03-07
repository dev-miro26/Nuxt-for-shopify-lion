export default {
    widgets: [
      {
        name: 'netlify',
        layout: {
          width: 'small'
        },
        options: {
          title: 'Project deploys',
          sites: [
            {
              title: 'Live Site',
              apiId: '5f2c70e6-9b0e-43fe-bfad-a9792e0994d9',
              buildHookId: '63d3327871823b2aad6e4331',
              name: 'artlife-nuxt'
            }
          ]
        }
      },
      {
        name: 'project-users',
        layout: {
          width: 'small'
        }
      },
      {
        name: 'project-info',
        layout: {
          width: 'small'
        }
      }
    ]
  }
