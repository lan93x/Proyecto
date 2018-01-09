<?php $__env->startSection('content'); ?>

<div class="ui container">
    <div class="ui middle aligned center aligned grid">
        <div class="six wide column">
            <h2 class="ui teal image header">
                <div class="content">
                    Ingrese
                </div>
            </h2>
            <form role="form" action="<?php echo e(route('login')); ?>" class="ui large form" method="POST">
                 <?php echo e(csrf_field()); ?>

                <div class="ui stacked segment">
                    <div class="field<?php echo e($errors->has('email') ? ' has-error' : ''); ?>">
                        <div class="ui left icon input">
                            <i class="user icon">
                            </i>
                            <input autofocus="" id="email" name="email" required="" type="email" value="<?php echo e(old('email')); ?>">
                                <?php if($errors->has('email')): ?>
                                <span class="help-block">
                                    <strong>
                                        <?php echo e($errors->first('email')); ?>

                                    </strong>
                                </span>
                                <?php endif; ?>
                            </input>
                        </div>
                     </div>
                    <div class="field<?php echo e($errors->has('password') ? ' has-error' : ''); ?>">
                        <div class="ui left icon input">
                            <i class="lock icon">
                            </i>
                            <input class="form-control" id="password" name="password" required="" type="password">
                                <?php if($errors->has('password')): ?>
                                <span class="help-block">
                                    <strong>
                                        <?php echo e($errors->first('password')); ?>

                                    </strong>
                                </span>
                                <?php endif; ?>
                            </input>
                        </div>
                    </div>
                    <div class="field">
                          <label>
                                <input type="checkbox" name="remember" <?php echo e(old('remember') ? 'checked' : ''); ?>> Recordarme
                            </label>
                    </div>
                    <button class="ui fluid large teal submit button" type="submit">
                        Entrar
                    </button>
                     <a class="ui fluid facebook button margen-auth" href="<?php echo e(env('APP_URL')); ?>/auth/facebook" >
                        <i class="facebook icon ">
                        </i>
                        Ingresar con Facebook
                    </a>
                </div>
                <div class="ui error message">
                </div>
            </form>
            <div class="ui message">
             
                <a class="" href="<?php echo e(route('password.request')); ?>">
                    Olvidaste tu contraseña?
                </a>
            </div>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>