#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { ToDoListStack } from '../lib/to-do-list-stack';

const app = new cdk.App();
new ToDoListStack(app, 'ToDoListStack');
