# Makefile

# Define variables
BUILD_DIR := $(if $(BUILD),$(BUILD),out)
MARKDOWN_FILES := $(wildcard *.md) $(wildcard */*.md)
# MARKDOWN_FILES := $(wildcard */*.md)
HTML_FILES := $(patsubst %.md,$(BUILD_DIR)/%.html,$(MARKDOWN_FILES))
HEADER_FILE := build/header.html  # Adjust this to the actual path of your header file
HGEN_EXECUTABLE := build/hgen

# Rule to build HTML files from Markdown
$(BUILD_DIR)/%.html: %.md $(HGEN_EXECUTABLE)
	@mkdir -p $(@D)
	$(HGEN_EXECUTABLE) $< $@ $(HEADER_FILE)

# Rule to build all HTML files
.PHONY: all
all: $(HTML_FILES)

# Rule to create the build directory
build:
	mkdir -p build

# remove all HTML files to force rebuild
generate: clean all

clean:
	rm -rf $(BUILD_DIR)

# Default rule
.DEFAULT_GOAL := all
