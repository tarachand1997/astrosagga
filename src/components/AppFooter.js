import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="http://www.astrosagga.com" target="_blank" rel="noopener noreferrer">
          Astrosagga
        </a>
        <span className="ms-1">&copy; {new Date().getFullYear()}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="http://www.astrosagga.com" target="_blank" rel="noopener noreferrer">
          Astrosagga
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
