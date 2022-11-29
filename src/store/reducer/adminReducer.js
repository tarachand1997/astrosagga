import * as types from '../types'
const initialState = {
    sidebarShow: true,
    unfoldable: false,
    categoryList: [],
    sliderList: [],
    astrologerList: [],
    userList: [],
    productCategoryList: [],
    blogList: [],
    productList: [],
    privacyPolicyList: [],
    termConditionList: [],
    coursesList: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIDEBAR:
            return { ...state, sidebarShow: action.payload }
        case types.SIDEBARFOLDABLE:
            return { ...state, unfoldable: action.payload }
        case types.CATEGORYDATA:
            return { ...state, categoryList: action.payload }
        case types.SLIDERDATA:
            return { ...state, sliderList: action.payload }
        case types.GETASTROLOGER:
            return { ...state, astrologerList: action.payload }
        case types.GETUSERS:
            return { ...state, userList: action.payload }
        case types.GETPRODUCTCATEGORY:
            return { ...state, productCategoryList: action.payload }
        case types.GETBLOGS:
            return { ...state, blogList: action.payload }
        case types.GETPRODUCTS:
            return { ...state, productList: action.payload }
        case types.GETPRIVACYPOLICY:
            return { ...state, privacyPolicyList: action.payload }
        case types.GETTERMCONDITION:
            return { ...state, termConditionList: action.payload }
        case types.GETCOURSES:
            return { ...state, coursesList: action.payload }
        default:
            return state
    }
}
export default adminReducer;