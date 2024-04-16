# Makefile

# Define variables
BUILD_DIR := $(if $(BUILD),$(BUILD),out)
MD_FILES := $(wildcard *.md) $(wildcard */*.md)
HTML_FILES := $(patsubst %.md,$(BUILD_DIR)/%.html,$(MD_FILES))
HEADER_FILE := build/header.html
HGEN_EXECUTABLE := build/hgen
JS_FILES := $(wildcard *.js)
CSS_FILES := $(wildcard *.css)
PY_FILES := $(wildcard *.py)
PNG_FILES := $(wildcard *.png)

# Phony targets for handling various file types
.PHONY: md js css py html generate clean

$(BUILD_DIR)/%.html: %.md $(HGEN_EXECUTABLE)
	@mkdir -p $(@D)
	$(HGEN_EXECUTABLE) $< $@ $(HEADER_FILE)

# Copy JS files
$(BUILD_DIR)/%.js: %.js | $(BUILD_DIR)
	cp $< $@

# Copy CSS files
$(BUILD_DIR)/%.css: %.css | $(BUILD_DIR)
	cp $< $@

# Copy PY files
$(BUILD_DIR)/%.py: %.py | $(BUILD_DIR)
	cp $< $@

# Copy PNG files
$(BUILD_DIR)/%.png: %.png | $(BUILD_DIR)
	cp $< $@

# Remove unnecessary files
clean:
	rm -rf $(BUILD_DIR) $(JS_FILES) $(CSS_FILES) $(PY_FILES)

# Generate HTML files
all: $(HTML_FILES) $(addprefix $(BUILD_DIR)/, $(JS_FILES)) $(addprefix $(BUILD_DIR)/, $(CSS_FILES)) $(addprefix $(BUILD_DIR)/, $(PY_FILES)) $(addprefix $(BUILD_DIR)/, $(PNG_FILES))

# Create build directory
build:
	mkdir -p build

# Default rule
.DEFAULT_GOAL := all
