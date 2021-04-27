/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: src/routes
 * 
 */
import { api } from './routes/api'
import { plans } from './routes/plans'
import { users } from './routes/users'
import { exercises } from './routes/exercises'
import { recipes } from './routes/recipes'
import { activities } from './routes/activities'

export const routes = {
    api,
    plans,
    users,
    exercises,
    recipes,
    activities
}