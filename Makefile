build/gz_2010_us_050_00_20m.zip:
	mkdir -p $(dir $@)
	curl -o $@ http://www2.census.gov/geo/tiger/GENZ2010/$(notdir $@)

build/gz_2010_us_050_00_20m.shp: build/gz_2010_us_050_00_20m.zip
	unzip -od $(dir $@) $<
	touch $@

build/counties.json: build/gz_2010_us_050_00_20m.shp
	node_modules/.bin/topojson \
		-o $@ \
		--projection='width = 960, height = 600, d3.geo.albersUsa() \
			.scale(1280) \
			.translate([width / 2, height / 2])' \
		--simplify=.5 \
		-- counties=$<

build/ny_zips_04212015.json: build/zips_new_york_v2.json
	node_modules/.bin/topojson \
		-o $@ \
		# --projection='width = 1500, height = 1600, d3.geo.mercator() \
		# 	.scale(160000) \
		# 	.translate([width / 2, height / 2])' \
		# --simplify=.5 \
		-- zips=$<



# ogr2ogr \
#   -f GeoJSON \
#   -where "ADM0_A3 IN ('GBR', 'IRL')" \
#   subunits.json \
#   ne_10m_admin_0_map_subunits.shp
