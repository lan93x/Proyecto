@extends('layouts.app')

@section('content')
<grid ordercolumn="id" searchcolumn="namearea" source="admin/api-area" title="Area Data">
</grid>
<script src="{{ asset('js/comp.js') }}">
</script>
@endsection
