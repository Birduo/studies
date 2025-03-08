# Define variables
BUILD_DIR := $(if $(BUILD),$(BUILD),out)
# MD_FILES := $(shell find . -name '*.md' | sed 's|./||')
HEADER_FILE := build/header.html
# HGEN_EXECUTABLE := build/hgen
HGEN_EXECUTABLE := build/exgen
MD_FILES := $(shell find . -name '*.md' ! -path "./$(BUILD_DIR)/*" | sed 's|./||')
HTML_FILES := $(patsubst %.md,$(BUILD_DIR)/%.html,$(MD_FILES))
JS_FILES := $(shell find . -name '*.js' ! -path "./$(BUILD_DIR)/*" | sed 's|./||')
CSS_FILES := $(shell find . -name '*.css' ! -path "./$(BUILD_DIR)/*" | sed 's|./||')
PY_FILES := $(shell find . -name '*.py' ! -path "./$(BUILD_DIR)/*" | sed 's|./||')
PNG_FILES := $(shell find . -name '*.png' ! -path "./$(BUILD_DIR)/*" | sed 's|./||')

# Phony targets for handling various file types
.PHONY: md js css py html generate clean

# Copy JS files
$(BUILD_DIR)/%.js: %.js | $(BUILD_DIR)
	@mkdir -p $(@D)
	cp $< $@

# Copy CSS files
$(BUILD_DIR)/%.css: %.css | $(BUILD_DIR)
	@mkdir -p $(@D)
	cp $< $@

# Copy PY files
$(BUILD_DIR)/%.py: %.py | $(BUILD_DIR)
	@mkdir -p $(@D)
	cp $< $@

# Copy PNG files
$(BUILD_DIR)/%.png: %.png | $(BUILD_DIR)
	@mkdir -p $(@D)
	cp $< $@

# Remove unnecessary files
clean:
	rm -rf $(BUILD_DIR)

all: $(BUILD_DIR) $(HTML_FILES) $(addprefix $(BUILD_DIR)/, $(JS_FILES)) $(addprefix $(BUILD_DIR)/, $(CSS_FILES)) $(addprefix $(BUILD_DIR)/, $(PY_FILES)) $(addprefix $(BUILD_DIR)/, $(PNG_FILES))

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(BUILD_DIR)/%.html: %.md $(HGEN_EXECUTABLE)
	@mkdir -p $(@D)
	$(HGEN_EXECUTABLE) $< $@ $(HEADER_FILE)

# Default rule
.DEFAULT_GOAL := all
