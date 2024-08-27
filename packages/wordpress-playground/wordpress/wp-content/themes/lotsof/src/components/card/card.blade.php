<article class="card">
    @if ($image)
        <figure class="_figure">
            {!! $image->html !!}
        </figure>
    @endif
    @if ($body)
        <div class="_body">
            @include('body.body', (array) $body)
        </div>
    @endif
</article>