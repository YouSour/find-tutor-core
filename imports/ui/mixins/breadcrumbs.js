import _ from 'lodash'

const breadcrumbMixin = {
  computed: {
    currentRouteMixin() {
      return this.$route
    },
    breadcrumbMixin() {
      let crumbList = []
      let parents = this.$_addParentRouteMixin(this.currentRouteMixin)
      parents.forEach(route => {
        crumbList.push(this.$_getBreadcrumbMixin(route))
      })
      // Add last current route
      crumbList.push(this.$_getBreadcrumbMixin(this.currentRouteMixin))

      return crumbList
    },
  },
  methods: {
    $_addParentRouteMixin(route) {
      let parent = this.$_getParentRouteMixin(route)
      // Check parent exist
      if (parent) {
        return _.concat(this.$_addParentRouteMixin(parent), parent)
      }

      return []
    },
    $_getParentRouteMixin(route) {
      const parent = route.meta.breadcrumb && route.meta.breadcrumb.parent
      if (parent) {
        return this.$router.resolve({ name: parent }).route
      }

      return null
    },
    $_getBreadcrumbMixin(route) {
      let crumb = {
        route: {},
        title:
          (route.meta.breadcrumb && route.meta.breadcrumb.title) ||
          route.meta.pageTitle ||
          'Unknown',
        icon: (route.meta.breadcrumb && route.meta.breadcrumb.icon) || null,
      }
      // Check name
      if (route.name) {
        crumb.route.name = route.name
      } else {
        crumb.route.path = route.path
      }

      // Check params
      if (route.meta.breadcrumb && route.meta.breadcrumb.params) {
        crumb.route.params = _.pick(
          this.currentRouteMixin.params,
          route.meta.breadcrumb.params
        )
      }

      // Check query
      if (route.meta.breadcrumb && route.meta.breadcrumb.query) {
        crumb.route.query = _.pick(
          this.currentRouteMixin.query,
          route.meta.breadcrumb.query
        )
      }

      return crumb
    },
  },
}

export default breadcrumbMixin
