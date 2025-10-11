---
name: Add New Color Schema
description: Propose a new color schema for terminal theming
title: '[Schema] Add [Schema Name] - [Brief Description]'
labels: ['schema-contribution', 'enhancement', 'hacktoberfest-accepted']
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Thanks for contributing to Coolema! Use the /generator page to create your schema, then paste the generated JSON/MDX here. We'll review, validate (min 16 colors with hex + rgb), and merge to /content/schemas. Follow [contribution docs](https://coolema.vercel.app/docs) for guidelines.

  - type: textarea
    id: schema-details
    attributes:
      label: Schema Details
      description: Provide title, description, tags, and author (from generator or custom).
      placeholder: |
        - **Title**: My Custom Schema
        - **Description**: A custom terminal color schema for ricing.
        - **Tags**: ["dark", "custom"]
        - **Author**: Your Name (@github-username)
    validations:
      required: true

  - type: textarea
    id: colors-json
    attributes:
      label: Colors Array (JSON)
      description: Paste the full colors array from the generator (min 16: color0 to color15, include name, hex, and rgb for full compatibility).
      placeholder: |
        [
         {
            "name": "color0",
            "hex": "#000000",
            "rgb": "0, 0, 0"
          },
          {
            "name": "color1",
            "hex": "#ff0000",
            "rgb": "255, 0, 0"
          }
          // ... continue up to color15
        ]
      render: json
    validations:
      required: true

  - type: textarea
    id: mdx-snippet
    attributes:
      label: Full Generated MDX Snippet
      description: Paste the complete MDX export from the generator (YAML frontmatter + body). This makes merging super easy!
      placeholder: |
        ---
        title: "My Custom Schema"
        description: "A custom terminal color schema"
        author: "Your Name"
        tags: ["dark", "custom"]
        colors:
          [
            {
              name: "color0",
              hex: "#000000",
              rgb: "0, 0, 0"
            }
            // ... full array
          ]
        ---
        
        # My Custom Schema
        
        A custom terminal color schema
        
        ## Installation
        
        Copy the configuration for your terminal emulator from the export options.
        
        ## Preview
        
        See the live preview above to see how this schema looks in action.
      render: markdown
    validations:
      required: true

  - type: textarea
    id: preview-screenshot
    attributes:
      label: Preview Screenshot (Optional but Recommended)
      description: Upload/link a screenshot from TerminalPreview to visualize the schema.
      placeholder: Drag-drop image or link: https://i.imgur.com/abc123.png

  - type: dropdown
    id: formats-tested
    attributes:
      label: Formats You've Tested
      description: Check which exports you've verified (from generator dropdown).
      multiple: true
      options:
        - Kitty (YAML)
        - Alacritty (TOML)
        - Foot
        - WezTerm
        - Other (comment below)

  - type: textarea
    id: additional-info
    attributes:
      label: Additional Info
      description: Notes, inspiration (e.g., from r/unixporn), or issues?

  - type: checkboxes
    id: confirm
    attributes:
      label: Confirmation
      description: Before submitting...
      options:
        - label: I agree to the [Code of Conduct](https://github.com/AdityaZxxx/coolema/blob/main/CODE_OF_CONDUCT.md)
          required: true
        - label: Schema has 16+ unique colors, valid hex/rgb, and follows guidelines
          required: true
