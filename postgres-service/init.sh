#!/bin/bash

psql -c 'CREATE DATABASE blog_data'
psql -U $POSTGRES_USER -d blog_data -a -f ../sql/blog_data_dump.sql
psql -c 'CREATE DATABASE react_data'
psql -U $POSTGRES_USER -d react_data -a -f ../sql/react_data_dump.sql