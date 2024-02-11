#!/bin/bash

psql -c 'CREATE DATABASE blog_data'
psql -U $POSTGRES_USER -d blog_data -a -f ../sql/blog_data_dump.sql
psql -c 'CREATE DATABASE issue_tracker_data'
psql -U $POSTGRES_USER -d issue_tracker_data -a -f ../sql/issue_tracker_data_dump.sql