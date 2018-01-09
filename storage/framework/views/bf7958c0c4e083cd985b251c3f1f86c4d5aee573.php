<div class="ui large top hidden menu">
    <div class="ui container">
        <a class="active item" href="<?php echo e(url('/')); ?>">
            <?php echo e(config('APP_NAME', 'Elproyecto')); ?>

        </a>
        
        <div class="right menu">
            <?php if(Auth::guest()): ?>
            <div class="item">
                <a class="nav-link" href="<?php echo e(route('login')); ?>">
                    Entrar
                </a>
            </div>
            <div class="item">
                <a class="nav-link" href="<?php echo e(route('register')); ?>">
                    Registrarse
                </a>
            </div>
            <?php else: ?>
            <div class="ui compact menu">
                <div class="ui simple dropdown item">
                  <?php echo e(Auth::user()->fullname); ?>

                    <i class="dropdown icon">
                    </i>
                    <div class="menu">
                        <div class="item">
                            <a class="dropdown-item" href="<?php echo e(route('logout')); ?>" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                            Salir
                        </a>
                        <form action="<?php echo e(route('logout')); ?>" id="logout-form" method="POST" style="display: none;">
                            <?php echo e(csrf_field()); ?>

                        </form>
                        </div>
                    </div>
                </div>
            </div>
            <?php endif; ?>
       
        </div>
    </div>
</div>
