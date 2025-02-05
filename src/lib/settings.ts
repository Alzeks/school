
type RouteAccessMap = {
    [key: string]: string[]
}

export const routeAccessMap: RouteAccessMap = {
    '/admin(.*)': ['admin'],
    '/student(.*)': ['student', 'admin'],
    '/teacher(.*)': ['teacher', 'admin'],
    '/parent(.*)': ['parent', 'admin'],
    '/list/teachers': ['admin', 'teacher'],
}


