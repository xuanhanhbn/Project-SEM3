// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle

  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    if (item.isShowMenu) {
      const TagName = resolveNavItemComponent(item)

      return <TagName {...props} key={index.toString()} item={item} />
    }
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
