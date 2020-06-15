import BookList from "../pages/book-list/BookList";
import HomePage from "../pages/home_page/HomePage";
import BookAdd from "../pages/book-add/BookAdd";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import AddEditBook from "../components/AddEditBook/AddEditBook";

const appRoute = [
    {
        name: 'HomePage',
        component: HomePage,
        exact: true,
        path: "/"
    },
    {
        name: 'BookList',
        component: BookList,
        exact: true,
        path: "/book-list"
    },
    {
        name: 'BokkAdd',
        component: BookAdd,
        exact: true,
        path: '/add-book'
    },
    {
        name: 'AddEditBook',
        component: AddEditBook,
        exact: true,
        path: '/add'
    },
    {
        name: 'AddEditBook',
        component: AddEditBook,
        exact: true,
        path: '/edit/:id'
    },
    {
        name: 'PageNotFound',
        component: PageNotFound,
        exact: true,
        path: '*'
    }
]

export default appRoute;