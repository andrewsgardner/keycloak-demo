#!/bin/bash

psql -c 'CREATE DATABASE angular_data'
psql -U $POSTGRES_USER -d angular_data -a -f ../sql/angular_data_dump.sql
psql -c 'CREATE DATABASE react_data'
psql -U $POSTGRES_USER -d react_data -a -f ../sql/react_data_dump.sql