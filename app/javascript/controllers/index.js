// Import and register all your controllers from the importmap under controllers/*

import { application } from "./application"

import DragController from './drag_controller'

application.register("drag", DragController)
