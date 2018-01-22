@extends('layouts.app')

@section('content')
<div class="ui equal width left aligned padded grid stackable">
    <div class="four wide tablet two three computer column">
        @include('inc.sidemenubar')
    </div>
    <div class="twelve wide tablet thirteen computer column" id="index">
        <div class="ui fluid icon input">
            <input placeholder="Search a very wide input..." type="text">
                <i class="search icon">
                </i>
            </input>
        </div>
        <div class="ui items">
            <div class="item" v-for="announce in announces">
                <div class="image">
                    <img :src="announce.image">
                    </img>
                </div>
                <div class="content">
                    <a class="header" v-bind:href="'/Anuncio/@'+ announce.id">
                        @{{ announce.year }} @{{ announce.brand }} @{{ announce.carmodel }} @{{ announce.subcategory }}
                    </a>
                    <div class="meta">
                        <span>
                            $us @{{ announce.price }}
                        </span>
                    </div>
                    <div class="description">
                        <p>
                            @{{announce.description}}
                        </p>
                    </div>
                    <div class="extra">
                        @{{ announce.color }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
