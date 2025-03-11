# Exgen
Statically generating this site with Exgen, successor to HGen.

As I've discussed before, I've been using [hgen](https://github.com/Birduo/hgen) to generate this site.
This is great for compiling *simple* markdown files, but it's not very great at more complex markdown files.

Aligning with this problem, I've been wanting to get into using Elixir as a programming language for a while, and I recently found [Earmark](https://hex.pm/packages/earmark) on Hex, the package repo for all BEAM languages (including Elixir).

Earmark is a markdown parser written in Elixir, more importantly, it's written in two stages. The first stage parses the markdown into an Abstract Syntax Tree (AST), and the second stage converts the AST into HTML. This makes my life much easier, as I can write my own transformations over the already-created AST. Then, I can take the modified AST and compile it to HTML, all using Earmark's builtin functions.

### Features
- `js` code blocks become embedded as `<script>` tags
- `javascript` code blocks stay as both code blocks and script tags
- `::<name>` becomes a `div` tag with `id=<name>`
- `<a>` tags, if `css` or `js` will directly add the css/js code
- by extension, pure links are no longer allowed

### Testing
I've had a great time testing with Mix, and I can create inline tests in module docs such as:

```elixir
@doc """
  iex> [ "```js", "console.log('test')", "```" ] |> Exgen.as_ast()
  [{"script", [], ["console.log('test')"], %{verbatim: true}}]

  iex> [ "::name" ] |> Exgen.as_ast()
  [{"canvas", [{"id", "name"}], [], %{}}]
"""
```

Or, I can test with an actual function inside my ExgenTest module:

```elixir
test "javascript code blocks" do
  js_block = ["```js", "console.log('test')", "```"]
  ast = Exgen.as_ast(js_block)
  assert ast == 
    [{"script", [], ["console.log('test')"], %{verbatim: true}}]
end
```

Functional programming for parsing prevails again, and after working on this project I'm eager to start using Elixir more.

### Navigation
- [Home](/)
- [Site](/site.md)

```js
document.title = "Exgen"
```

